import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const [singleQuote, setSingleQuote] = useState(false)
  const [noSpace, setNoSpace] = useState(false)
  const [lineBreak, setLineBreak] = useState(false)
  const [perCharacter, setPerCharacter] = useState(false)

  let quote = ''
  if (singleQuote) {
    quote = "'"
  } else {
    quote = '"'
  }

  function handleSingleQuoteChange() {
    setSingleQuote(!singleQuote)
  }

  function handleNoSpaceChange() {
    setNoSpace(!noSpace)
  }

  function handleLineBreakChange() {
    setLineBreak(!lineBreak)
  }

  function handleSplitPerCharacterChange() {
    setPerCharacter(!perCharacter)
    if (lineBreak) {
      setLineBreak(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (input.length === 0) {
      alert('Input cannot be empty.')
      return
    }

    let splitString = ''
    let modifiedString = []

    if (lineBreak) {
      splitString = input.split(/\r?\n/)
    } else if (perCharacter) {
      splitString = input.replace(/\s+/g, '');
      splitString = splitString.split('')
    } else {
      splitString = input.split(' ')
    }

    if (noSpace) {
      for (let i = 0; i < splitString.length; i++) {
        modifiedString.push(`${quote}${splitString[i]}${quote}`)
      }

      setOutput(modifiedString)
    } else {
      for (let i = 0; i < splitString.length; i++) {
        if (i === 0) {
          modifiedString.push(`${quote}${splitString[i]}${quote}`)
        } else {
          modifiedString.push(` ${quote}${splitString[i]}${quote}`)
        }

        setOutput(modifiedString)
      }
    }
  }

  function handleOnChange(e) {
    setInput(e.target.value);
  }

  function quickFill(e) {
    setInput(e)
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2500)
    } catch (err) {
      console.log(err)
      alert('Something went wrong :( you can report bugs at this url: https://github.com/boogerbuttcheeks/text2array')
    }
  }

  return (
    <div className='app'>
      <h1>Text 2 Array</h1>
      <p>Made by <a href='https://trevortylerlee.com'>Trevor Lee</a></p>
      <div className='settings'>
        <div className='setting'>
          <input type="checkbox"
            id="single-quote"
            name="single-quote"
            onClick={handleSingleQuoteChange}
          />
          <label htmlFor="single-quote">Single quote</label>
        </div>
        <div className='setting'>
          <input type="checkbox"
            id="no-space"
            name="no-space"
            onClick={handleNoSpaceChange}
          />
          <label htmlFor="no-space">No spaces</label>
        </div>
        <div className='setting'>
          <input type="checkbox"
            id="line-break"
            name="line-break"
            onClick={handleLineBreakChange}
            disabled={perCharacter}
            checked={lineBreak}
            onChange={() => { }}
          />
          <label htmlFor="line-break">Split by line break</label>
        </div>
        <div className='setting'>
          <input type="checkbox"
            id="per-character"
            name="per-character"
            checked={perCharacter ? true : false}
            onClick={handleSplitPerCharacterChange}
          />
          <label htmlFor="per-character">Split per character</label>
        </div>
      </div>
      <div className='input-wrapper'>
        <div className='textarea-wrapper'>
          <form>
            <textarea
              value={input}
              onChange={handleOnChange}
              placeholder={lineBreak ?
                'one two three\nfour five six' :
                'one two three'}
            />
          </form>
          <div className='generate-wrapper'>
            <button onClick={handleSubmit}>Generate</button>
          </div>
        </div>
        <div className='textarea-wrapper'>
          <form>
            <textarea
              placeholder={
                noSpace
                  ? perCharacter
                    ? `${quote}o${quote},${quote}n${quote},${quote}e${quote},${quote}t,${quote},${quote}w${quote},${quote}o${quote},${quote}t${quote},${quote}h${quote},${quote}r${quote},${quote}e${quote},${quote}e${quote}`
                    :
                    lineBreak
                      ? `${quote}one two three${quote},${quote}four five six${quote}`
                      : `${quote}one${quote},${quote}two${quote},${quote}three${quote}`
                  : perCharacter
                    ? `${quote}o${quote}, ${quote}n${quote}, ${quote}e${quote}, ${quote}t, ${quote}, ${quote}w${quote}, ${quote}o${quote}, ${quote}t${quote}, ${quote}h${quote}, ${quote}r${quote}, ${quote}e${quote}, ${quote}e${quote}`
                    :
                    lineBreak
                      ? `${quote}one two three${quote}, ${quote}four five six${quote}`
                      : `${quote}one${quote}, ${quote}two${quote}, ${quote}three${quote}`
              }
              value={output}
              readOnly
            />
          </form>
          <div className='generate-wrapper'>
            <button onClick={copyToClipboard}>{copied ? 'Copied!' : 'Copy'}</button>
          </div>
        </div>
      </div>
      <h2>Quick fill</h2>
      <h3>Numbers</h3>
      <div className="quick-fill-wrapper">
        <button onClick={() => {
          quickFill('1 2 3 4 5 6 7 8 9 10')
          setPerCharacter(false)
          setLineBreak(false)
        }}>1 - 10</button>
        <button onClick={() => {
          quickFill('1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20')
          setPerCharacter(false)
          setLineBreak(false)
        }}>1 - 20</button>
        <button onClick={() => {
          quickFill('1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50')
          setPerCharacter(false)
          setLineBreak(false)
        }}>1 - 50</button>
        <button onClick={() => {
          quickFill('1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100')
          setPerCharacter(false)
          setLineBreak(false)
        }}>1 - 100</button>
      </div>
      <h3>Letters</h3>
      <div className="quick-fill-wrapper">
        <button onClick={() => {
          quickFill('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
          setPerCharacter(true)
          setLineBreak(false)
        }}>A - Z</button>
        <button onClick={() => {
          quickFill('abcdefghijklmnopqrstuvwxyz')
          setPerCharacter(true)
          setLineBreak(false)
        }}>a - z</button>
        <button onClick={() => {
          quickFill('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz')
          setPerCharacter(true)
          setLineBreak(false)
        }}>Aa - Zz</button>
      </div>
      <h3>Dates</h3>
      <div className="quick-fill-wrapper">
        <button onClick={() => {
          quickFill('Monday Tuesday Wednesday Thursday Friday Saturday Sunday')
          setPerCharacter(false)
          setLineBreak(false)
        }}>Mon - Sun</button>
        <button onClick={() => {
          quickFill('January February March April May June July August September October November December')
          setPerCharacter(false)
          setLineBreak(false)
        }}>Jan - Dec</button>
        <button onClick={() => {
          quickFill('Rat Ox Tiger Rabbit Dragon Snake Horse Goat Monkey Rooster Dog Pig')
          setPerCharacter(false)
          setLineBreak(false)
        }}>Chinese zodiac</button>
        <button onClick={() => {
          quickFill('Aries Taurus Gemini Cancer Leo Virgo Libra Scorpio Sagittarius Capricorn Aquarius Pisces')
          setPerCharacter(false)
          setLineBreak(false)
        }}>Western zodiac</button>
      </div>
      <h3>Locations</h3>
      <div className="quick-fill-wrapper">
        <button onClick={() => {
          quickFill('Afghanistan\nAlbania\nAlgeria\nAndorra\nAngola\nAntigua and Barbuda\nArgentina\nArmenia\nAustralia\nAustria\nAzerbaijan\nBahamas\nBahrain\nBangladesh\nBarbados\nBelarus\nBelgium\nBelize\nBenin\nBhutan\nBolivia\nBosnia and Herzegovina\nBotswana\nBrazil\nBrunei\nBulgaria\nBurkina Faso\nBurundi\nCambodia\nCameroon\nCanada\nCape Verde\nCentral African Republic\nChad\nChile\nChina\nColombia\nComoros\nCongo Democratic Republic\nCongo Republic\nCosta Rica\nCroatia\nCuba\nCyprus\nCzech Republic\nDenmark\nDjibouti\nDominica\nDominican Republic\nEast Timor\nEcuador\nEgypt\nEl Salvador\nEquatorial Guinea\nEritrea\nEstonia\nEthiopia\nEswatini\nFiji\nFinland\nFrance\nGabon\nGambia\nGeorgia\nGermany\nGhana\nGreece\nGrenada\nGuatemala\nGuinea\nGuinea-Bissau\nGuyana\nHaiti\nHonduras\nHungary\nIceland\nIndia\nIndonesia\nIran\nIraq\nIreland\nIsrael\nItaly\nIvory Coast\nJamaica\nJapan\nJordan\nKazakhstan\nKenya\nKiribati\nKorea North\nKorea South\nKosovo\nKuwait\nKyrgyzstan\nLaos\nLatvia\nLebanon\nLesotho\nLiberia\nLibya\nLiechtenstein\nLithuania\nLuxembourg\nMacedonia\nMadagascar\nMalawi\nMalaysia\nMaldives\nMali\nMalta\nMarshall Islands\nMauritania\nMauritius\nMexico\nMicronesia\nMoldova\nMonaco\nMongolia\nMontenegro\nMorocco\nMozambique\nMyanmar\nNamibia\nNauru\nNepal\nNetherlands\nNew Zealand\nNicaragua\nNiger\nNigeria\nNorth Macedonia\nNorway\nOman\nPakistan\nPalau\nPalestine\nPanama\nPapua New Guinea\nParaguay\nPeru\nPhilippines\nPoland\nPortugal\nQatar\nRomania\nRussian Federation\nRwanda\nSt Kitts and Nevis\nSt Lucia\nSaint Vincent and the Grenadines\nSamoa\nSan Marino\nSao Tome and Principe\nSaudi Arabia\nSenegal\nSerbia\nSeychelles\nSierra Leone\nSingapore\nSlovakia\nSlovenia\nSolomon Islands\nSomalia\nSouth Africa\nSouth Sudan\nSpain\nSri Lanka\nSudan\nSuriname\nSweden\nSwitzerland\nSyria\nTaiwan\nTajikistan\nTanzania\nThailand\nTogo\nTonga\nTrinidad and Tobago\nTunisia\nTurkey\nTurkmenistan\nTuvalu\nUganda\nUkraine\nUnited Arab Emirates\nUnited Kingdom\nUnited States\nUruguay\nUzbekistan\nVanuatu\nVatican City\nVenezuela\nVietnam\nYemen\nZambia\nZimbabwe')
          setPerCharacter(false)
          setLineBreak(true)
        }}>Countries</button>
        <button onClick={() => {
          quickFill('Alberta\nBritish Columbia\nManitoba\nNew Brunswick\nNewfoundland and Labrador\nNorthwest Territories\nNova Scotia\nNunavut\nOntario\nPrince Edward Island\nQuebec\nSaskatchewan\nYukon')
          setPerCharacter(false)
          setLineBreak(true)
        }}>🇨🇦 Provinces and territories</button>
        <button onClick={() => {
          quickFill('Alabama\nAlabama\nArkansas\nCalifornia\nColorado\nConnecticut\nDelaware\nFlorida\nGeorgia\nHawaii\nIdaho\nIllinois\nIndiana\nIowa\nKansas\nKentucky\nLouisiana\nMaine\nMaryland\nMassachusetts\nMichigan\nMinnesota\nMississippi\nMissouri\nMontana\nNebraska\nNevada\nNew Hampshire\nNew Jersey\nNew Mexico\nNew York\nNorth Carolina\nNorth Dakota\nOhio\nOklahoma\nOregon\nPennsylvania\nRhode Island\nSouth Carolina\nSouth Dakota\nTennessee\nTexas\nUtah\nVermont\nVirginia\nWashington\nWest Virginia\nWisconsin\nWyoming')
          setPerCharacter(false)
          setLineBreak(true)
        }}>🇺🇸 States and territories</button>
        <button onClick={() => {
          quickFill('Mercury Venus Earth Mars Jupiter Saturn Uranus Neptune')
          setPerCharacter(false)
          setLineBreak(false)
        }}>🪐 Planets</button>
        <button onClick={() => {
          quickFill('Africa Antarctica Asia Australia Europe North America South America')
          setPerCharacter(false)
          setLineBreak(false)
        }}>🌎 Continents</button>
      </div>
      <h3>Misc.</h3>
      <div className="quick-fill-wrapper">
        <button onClick={() => {
          quickFill('Hydrogen Helium Lithium Beryllium Boron Carbon Nitrogen Oxygen Fluorine Neon Sodium Magnesium Aluminum Silicon Phosphorus Sulfur Chlorine Argon Potassium Calcium Scandium Titanium Vanadium Chromium Manganese Iron Cobalt Nickel Copper Zinc Gallium Germanium Arsenic Selenium Bromine Krypton Rubidium Strontium Yttrium Zirconium Niobium Molybdenum Technetium Ruthenium Rhodium Palladium Silver Cadmium Indium Tin Antimony Tellurium Iodine Xenon Cesium Barium Lanthanum Cerium Praseodymium Neodymium Promethium Samarium Europium Gadolinium Terbium Dysprosium Holmium Erbium Thulium Ytterbium Lutetium Hafnium Tantalum Tungsten Rhenium Osmium Iridium Platinum Gold Mercury Thallium Lead Bismuth Polonium Astatine Radon Francium Radium Actinium Thorium Protactinium Uranium Neptunium Plutonium Americium Curium Berkelium Californium Einsteinium Fermium Mendelevium Nobelium Lawrencium Rutherfordium Dubnium Seaborgium Bohrium Hassium Meitnerium Darmstadtium Roentgenium Copernicium Nihonium Flerovium Moscovium Livermorium Tennessine Oganesson')
          setPerCharacter(false)
          setLineBreak(false)
        }}>🧪 Chemical elements</button>
        <button onClick={() => {
          quickFill("Admiral\nAgent S\nAgnes\nAl\nAlfonso\nAlice\nAlli\nAmelia\nAnabelle\nAnchovy\nAngus\nAnicotti\nAnkha\nAnnalisa\nAnnalise\nAntonio\nApollo\nApple\nAstrid\nAudie\nAurora\nAva\nAvery\nAxel\nBaabara\nBam\nBangle\nBarold\nBea\nBeardo\nBeau\nBecky\nBella\nBenedict\nBenjamin\nBertha\nBettina\nBianca\nBiff\nBig Top\nBill\nBilly\nBiskit\nBitty\nBlaire\nBlanche\nBluebear\nBob\nBonbon\nBones\nBoomer\nBoone\nBoots\nBoris\nBoyd\nBree\nBroccolo\nBroffina\nBruce\nBubbles\nBuck\nBud\nBunnie\nButch\nBuzz\nCally\nCamofrog\nCanberra\nCandi\nCarmen\nCaroline\nCarrie\nCashmere\nCelia\nCesar\nChadder\nCharlise\nCheri\nCherry\nChester\nChevre\nChief\nChops\nChow\nChrissy\nClaude\nClaudia\nClay\nCleo\nClyde\nCoach\nCobb\nCoco\nCole\nColton\nCookie\nCousteau\nCranston\nCroque\nCube\nCurlos\nCurly\nCurt\nCyd\nCyrano\nDaisy\nDeena\nDeirdre\nDel\nDeli\nDerwin\nDiana\nDiva\nDizzy\nDobie\nDoc\nDom\nDora\nDotty\nDrago\nDrake\nDrift\nEd\nEgbert\nElise\nEllie\nElmer\nEloise\nElvis\nErik\nEugene\nEunice\nFang\nFauna\nFelicity\nFilbert\nFlip\nFlo\nFlora\nFlurry\nFrancine\nFrank\nFreckles\nFreya\nFriga\nFrita\nFrobert\nFuchsia\nGabi\nGala\nGaston\nGayle\nGenji\nGigi\nGladys\nGloria\nGoldie\nGonzo\nGoose\nGraham\nGreta\nGrizzly\nGroucho\nGruff\nGwen\nHamlet\nHamphrey\nHans\nHarry\nHazel\nHenry\nHippeux\nHopkins\nHopper\nHornsby\nHuck\nHugh\nIggly\nIke\nJacob\nJacques\nJambette\nJay\nJeremiah\nJitters\nJoey\nJudy\nJulia\nJulian\nJune\nKabuki\nKatt\nKeaton\nKen\nKetchup\nKevin\nKid Cat\nKidd\nKiki\nKitt\nKitty\nKlaus\nKnox\nKody\nKyle\nLeonardo\nLeopold\nLily\nLimberg\nLionel\nLobo\nLolly\nLopez\nLouie\nLucha\nLucky\nLucy\nLyman\nMac\nMaddie\nMaelle\nMaggie\nMallary\nMaple\nMarcel\nMarcie\nMargie\nMarina\nMarshal\nMathilda\nMegan\nMelba\nMerengue\nMerry\nMidge\nMint\nMira\nMiranda\nMitzi\nMoe\nMolly\nMonique\nMonty\nMoose\nMott\nMuffy\nMurphy\nNan\nNana\nNaomi\nNate\nNibbles\nNorma\nOctavian\nO'Hare\nOlaf\nOlive\nOlivia\nOpal\nOzzie\nPancetti\nPango\nPaolo\nPapi\nPashmina\nPate\nPatty\nPaula\nPeaches\nPeanut\nPecan\nPeck\nPeewee\nPeggy\nPekoe\nPenelope\nPhil\nPhoebe\nPierce\nPietro\nPinky\nPiper\nPippy\nPlucky\nPompom\nPoncho\nPoppy\nPortia\nPrince\nPuck\nPuddles\nPudge\nPunchy\nPurrl\nQueenie\nQuillson\nRaddle\nRasher\nRaymond\nRenée\nReneigh\nRex\nRhonda\nRibbot\nRicky\nRizzo\nRoald\nRobin\nRocco\nRocket\nRod\nRodeo\nRodney\nRolf\nRooney\nRory\nRoscoe\nRosie\nRowan\nRuby\nRudy\nSally\nSamson\nSandy\nSavannah\nScoot\nShari\nSheldon\nShep\nSherb\nSimon\nSkye\nSly\nSnake\nSnooty\nSoleil\nSparro\nSpike\nSpork\nSprinkle\nSprocket\nStatic\nStella\nSterling\nStinky\nStitches\nStu\nSydney\nSylvana\nSylvia\nTabby\nTad\nTammi\nTammy\nTangy\nTank\nTasha\nT-Bone\nTeddy\nTex\nTia\nTiffany\nTimbra\nTipper\nTom\nTruffles\nTucker\nTutu\nTwiggy\nTybalt\nUrsala\nVelma\nVesta\nVic\nVictoria\nViolet\nVivian\nVladimir\nWade\nWalker\nWalt\nWart Jr.\nWeber\nWendy\nWhitney\nWillow\nWinnie\nWolfgang\nYuka\nZell\nZucker")
          setPerCharacter(false)
          setLineBreak(true)
        }}>ACNH Villagers</button>
      </div>
    </div>
  )
}

export default App
