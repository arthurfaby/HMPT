import ky from 'ky'

export default async function postRegister(user: any) {

    const response = await ky.post('http://localhost:5000/', {json: user})

}