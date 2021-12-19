import { CountryType } from "./types"
import axios from "axios"
import { useState, useEffect } from "react"
import Country from "./Country"
import Loading from "./Loading"

const App = () => {

    const [countries, setCountries] = useState<CountryType[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const getCountries = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get<CountryType[]>("https://restcountries.com/v2/all")
            setCountries(data)
        } catch {
            console.log("error")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCountries()
    }, [])

    console.log({ countries })



    return (
        <div>
            <Loading loading={loading}> 

            {loading ? "Loading..." : countries.map(country => <Country key={country.name} country={country} />)}
            </Loading>
        </div>
    )
}



export default App
