const softDeleteAccount = async (app, pool, url) => {
  app.post(url, async (req, res) => {
    const user_id = req.body.user_id;
    const deleted = true;
    const date = Math.floor(Date.now() / 1000);
    await pool.query(
      'UPDATE users SET is_deleted = $1, deleted_on = $2 WHERE user_id = $3',
      [deleted, date, user_id]
    );
    res.send({
      message:
        'account has been deleted. If you change your mind your account can be recovered at anytime in the next 30 days.',
    });
  });
};

module.exports = softDeleteAccount;
