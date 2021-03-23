export default function initFeatureController(db) {
  const featureList = async (req, res) => {
    try {
      const features = await db.Feature.findAll();
      res.send(features);
    } catch (err) {
      console.log(err);
    }
  };

  return { featureList };
}
