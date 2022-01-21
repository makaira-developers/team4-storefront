import {useState} from 'react'
import { Button, Copytext, Heading } from '../index'
import fetch from 'isomorphic-unfetch'

function SizeFinder(props) {

  const {withinList = false} = props

  const [showResult, setShowResult] = useState(false)
  const [ubu, setUbu] = useState(null)
  const [bu, setBu] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('/api/calculate-size', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      //body: JSON.stringify(body),
    })

    const data = await response.json()

    setShowResult(data.status === 'success')
    setUbu(data.ubu)
    setBu(data.bu)
  }

  const showResults = () => {
    if (withinList) {
      const targetFilter = document.querySelector(`.desktop-filter input[value='${ubu} | ${bu}']`)

      if(targetFilter) {
        targetFilter.click()
        setShowResult(false)
      }
    } else {
      location.href = `/c/bhs/?filter[mak_bh_size][0]=${ubu} | ${bu}`
    }
  }

  if (withinList) return (
    <section className="size-finder">
      <Heading size="bacchus">Größenfinder</Heading>
      <div className="size-finder-container">
        <div className="size-finder__input-group">
          <label htmlFor="ubu">Unterbrustumfang</label>
          <input id="ubu" type="number" placeholder="Unterbrustumfang in cm" />
        </div>
        <div className="size-finder__input-group">
          <label htmlFor="ub">Brustumfang</label>
          <input id="ub" type="number" placeholder="Brustumfang in cm" />
        </div>
        <Button onClick={handleSubmit}>Größe berechnen</Button>
        {showResult && (
          <div>
            <Copytext>Deine SugarShape Größe ist: {ubu} | {bu} </Copytext>
            <Button onClick={showResults}>Ergebnisse anzeigen</Button>
          </div>
        )}
      </div>
    </section>
  )

  return (
    <section className="size-finder">
      <Heading>Größenfinder</Heading>
      <form className="size-finder-container" onSubmit={handleSubmit}>
        <div className="size-finder__input-group">
          <label htmlFor="ubu">Unterbrustumfang</label>
          <input id="ubu" type="number" placeholder="Unterbrustumfang in cm" />
        </div>
        <div className="size-finder__input-group">
          <label htmlFor="ub">Brustumfang</label>
          <input id="ub" type="number" placeholder="Brustumfang in cm" />
        </div>
        <Button type="submit">Größe berechnen</Button>
        {showResult && (
          <div>
            <Copytext>Deine SugarShape Größe ist: {ubu} | {bu} </Copytext>
            <Button onClick={showResults}>Ergebnisse anzeigen</Button>
          </div>
        )}
      </form>
    </section>
  )
}

export default SizeFinder
export { default as sizeFinderVariants } from './variants.js'