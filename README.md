# Next is not a function — Diagnosis & Fix

This README explains the "next is not a function" error encountered in this project, why it happens, how it was fixed, and how to reproduce and test the fix.

## Symptom

When running the app or saving a user document, you may see a runtime error similar to:

```
TypeError: next is not a function
    at .../src/models/user.model.js:30:XX
    ...
```

Or an operation that should save a user fails silently or crashes with that stack trace.

## Root cause

The project used a Mongoose pre('save') middleware written as an async function that accepted a `next` parameter and called `next()` inside the async function. Example (problematic):

```js
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
```

When Mongoose executes asynchronous middleware, mixing the `async` function signature with explicit `next()` calls can lead to `next` being undefined in some execution paths (especially in modern Mongoose versions). In short: using async/await and also calling `next()` is inconsistent and may cause `next` to not be a function.

## The fix applied

Switch the pre-save hook to use async/await flow without accepting or calling `next`. In async middleware, returning/awaiting the promise is enough — Mongoose will handle completion or rejection.

Correct implementation (applied in `src/models/user.model.js`):

```js
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
```

This removes the `next` parameter and all `next()` calls so the async function completes naturally.

## Alternatives

- Use a non-async callback style with `next()` and error handling:

```js
userSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  });
});
```

- Keep async/await but explicitly use the 3-argument form of middleware only when needed with `next` consistently; prefer the simpler async style shown above.

## Files changed

- `src/models/user.model.js` — removed use of `next` and updated the pre-save hook to async/await style.

## How to reproduce (before and after)

1. Start the server (project root):

```bash
node src/server
```

2. Send a registration request to exercise the save hook (example using curl):

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"t@example.com","password":"secret123"}'
```

Before the fix, this could fail with "next is not a function". After the fix, the user should be created and the response should return a token and user object.

## Notes and recommendations

- Prefer one style: either async/await (no `next`) or callback with `next(err)` — do not mix them.
- If you need to propagate errors inside async middleware, simply throw an error or let the promise reject; Mongoose will forward it to the error handler.
- If you have other custom middleware written as `async (req, res, next) => { ... }`, ensure you use `next` correctly (you can keep `next` there), but for Mongoose hooks the pattern differs slightly.

## Contact

If you want, I can add a tiny integration test (using supertest) that registers a user to verify the pre-save hook behavior automatically.
