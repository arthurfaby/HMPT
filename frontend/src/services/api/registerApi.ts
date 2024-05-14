import ky from 'ky'

export default async function postRegister(user: any): Promise<Response>{

    return await ky.post('http://localhost:5000/register', {json: user})

}