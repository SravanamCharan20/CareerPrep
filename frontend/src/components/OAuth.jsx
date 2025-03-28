import { motion } from "framer-motion";
import {GoogleAuthProvider} from 'firebase/auth'
import {getAuth, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {signInSuccess} from '../redux/user/userSlice.js'

export default function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            })
            const data = await res.json()
            console.log(data)
            dispatch(signInSuccess(data))
            navigate('/')
        } catch (error) {
            console.error("could not sign in with google", error)
        }
    }
  return (
    <div>
      <motion.button
            onClick={handleGoogleClick}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 border border-[#424245] rounded-lg text-white hover:border-[#2997ff] transition-colors flex items-center justify-center space-x-2"
          >
            <img src="/images/google-logo.webp" alt="Google" className="w-5 h-5" />
            <span>Continue with Google</span>
          </motion.button>
    </div>
  )
}
