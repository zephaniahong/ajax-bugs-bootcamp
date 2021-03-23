export default function initBugController(db) {
  const index = async (req, res) => {
    try {
      res.render('index');
    }
    catch (err) {
      console.log(err);
    }
  };
  const newBug = async (req, res) => {
    const {
      featureId, bugProblem, bugErrorText, bugCommit,
    } = req.body;
    const { userId } = req.cookies;
    try {
      await db.Bug.create({
        problem: bugProblem,
        errorText: bugErrorText,
        commit: bugCommit,
        featureId,
        userId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return { index, newBug };
}
