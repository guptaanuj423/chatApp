const pool = require("../config/db");

const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
        "SELECT id,username FROM userMaster ORDER BY id ASC"
    );

    res.json(result.rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server error"+err
    });
  }
};

module.exports = {
  getUsers,
};