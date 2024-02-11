const GenerateOTP = () => {
    let otp = '';
    for (let index = 0; index <=3; index++) {
      const randval = Math.round(Math.random() * 9)
      otp = otp + randval
    }
    return otp
  }
export default GenerateOTP  