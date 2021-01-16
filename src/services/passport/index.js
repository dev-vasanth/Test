import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { jwtSecret, masterKey } from '../../config'
import Users from '../../api/users/model';
export const loginToken = ({ required } = {}) => (
    req,
    res,
    next
) =>
    passport.authenticate('token', { session: false }, (err, user, info) => {
        if (user) {
            const userData = Users.findOne({ _id: data.id }).populate('institutionDetails');
            res.send({ success: true, message: "invalid User", data: userData.view });
        } else {
            res.send({ success: false, message: "invalid User" });
        }

    })(req, res, next)


export const token = (req, res, next
) =>
    passport.authenticate('token', { session: false }, (err, user, info) => {
        if (user && !err) {
            req.body.userdata = user
            next()
        } else {
            res.send({ success: false, message: "invalid Token" })
            //400 bad request
        }
    })(req, res, next)

passport.use(
    'token',
    new JwtStrategy(
        {
            secretOrKey: jwtSecret,
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromUrlQueryParameter('access_token'),
                ExtractJwt.fromBodyField('access_token'),
                ExtractJwt.fromAuthHeaderWithScheme('Bearer')
            ])
        },
        (data, done) => {
            Users.findOne({ _id: data._id }, (err, user) => {
                if (user) {
                    done(null, user.view())
                } else {
                    done(null)
                }
            })
        }
    )
)
