const db = require("../data/db-config");

module.exports = {
  find() {
    return db("schemes");
  },
  findById(id) {
    return db("schemes").where("id", id).first();
  },
  findSteps(id) {
    return db("steps as stp")
      .join("schemes as sch", "stp.scheme_id", "sch.id")
      .select(
        "stp.id",
        "sch.scheme_name",
        "stp.step_number",
        "stp.instructions"
      )
      .where("sch.id", id)
      .orderBy("stp.step_number");
  },
  add(scheme) {
    return db("schemes")
      .insert(scheme)
      .then(([id]) => {
        return db("schemes").where("id", id).first();
      });
  },
  update(changes, id) {
    return db("schemes").where("id", id).update(changes);
  },
  remove(id) {
    return db("schemes").where("id", id).del();
  },
};
