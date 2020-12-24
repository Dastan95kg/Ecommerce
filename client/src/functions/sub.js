import axios from 'axios';

export const getSubs = async () =>
    await axios.get(`${process.env.REACT_APP_API}/subs`)

export const getSub = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`)

export const deleteSub = async (authtoken, slug) =>
    await axios.delete(
        `${process.env.REACT_APP_API}/sub/${slug}`,
        { headers: { authtoken } }
    )

export const createSub = async (authtoken, sub, parent) =>
    await axios.post(
        `${process.env.REACT_APP_API}/sub`,
        { name: sub, parent },
        { headers: { authtoken } }
    )

export const updateSub = async (authtoken, sub, slug) => {
    return await axios.put(
        `${process.env.REACT_APP_API}/sub/${slug}`,
        { name: sub },
        { headers: { authtoken } }
    )
}