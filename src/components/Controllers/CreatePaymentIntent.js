import { ApiUrl } from "../../constants/globalUrl";

const creatPaymentIntent = async (data) => {
        await ApiUrl.post('api/subs/payment-sheet', data).then(res => res).catch(err => err)
}

export default creatPaymentIntent