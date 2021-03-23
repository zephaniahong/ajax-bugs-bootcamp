import jsSHA from 'jssha';

export default function initUserController(db) {
  const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await db.User.findOne({
        where: {
          email,
        },
      });
      // check if user login is valid
      if (user) {
        const shaObj = new jsSHA('SHA-256', 'TEXT', { encoding: 'UTF8' });
        shaObj.update(password);
        const hashedPassword = shaObj.getHash('HEX');
        if (user.password === hashedPassword) {
          res.cookie('userId', user.id);
          res.send('true');
        }
        else {
          res.send('false');
        }
      } else {
        res.send('false');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return { login };
}
