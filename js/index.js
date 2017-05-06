import React from 'react'
import ReactDOM from 'react-dom'

const rowNumbers = [1, 2, 3, 4, 5, 6, 7, 8]
const colLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']

const items = [
  {
    icon: 'icon-old-man'
  },
  {
    icon: 'icon-shopkeeper'
  },
  {
    icon: 'icon-old-woman'
  },
  {
    icon: 'icon-white-sword'
  },
  {
    icon: 'icon-magic-sword'
  },
  {
    icon: 'icon-bomb'
  },
  {
    icon: 'icon-ladder'
  },
  {
    icon: 'icon-key'
  },
  {
    icon: 'icon-flute'
  },
  {
    icon: 'icon-meat'
  },
  {
    icon: 'icon-red-potion'
  },
  {
    icon: 'icon-heart'
  },
  {
    icon: 'icon-blue-ring'
  },
  {
    icon: 'icon-coin'
  },
  {
    icon: 'icon-clear'
  }
]

class Helper extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      gridIcons: {},
      gridLevels: {},
      selectedItem: null,
      selectedLevel: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.renderCell = this.renderCell.bind(this)
    this.clickItem = this.clickItem.bind(this)
    this.clickGrid = this.clickGrid.bind(this)
    this.clickLevel = this.clickLevel.bind(this)
  }

  componentDidMount() {
  }

  handleChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  clickGrid(r, c) {
    if (this.state.selectedItem !== null) {
      let gridIcons = Object.assign({}, this.state.gridIcons)
      gridIcons[r + c] = this.state.selectedItem
      this.setState({
        gridIcons: gridIcons
      })
    } else if (this.state.selectedLevel !== null) {
      let gridLevels = Object.assign({}, this.state.gridLevels)
      gridLevels[r + c] = this.state.selectedLevel
      this.setState({
        gridLevels: gridLevels
      })
    }
  }

  clickItem(idx) {
    this.setState({
      selectedItem: idx,
      selectedLevel: null
    })
  }

  clickLevel(l) {
    this.setState({
      selectedItem: null,
      selectedLevel: l
    })
  }

  renderCell(r, c) {
    let _id = 'cell-' + r + '-' + c
    let level = <div></div>
    let item = <div></div>
    if (typeof this.state.gridIcons[r + c] !== 'undefined') {
      item = <img className={'grid-icon ' + items[this.state.gridIcons[r + c]].icon}></img>
    }
    if (typeof this.state.gridLevels[r + c] !== 'undefined') {
      level = <span className="grid-level">{this.state.gridLevels[r + c]}</span>
    }
    return (
      <td key={_id} id={_id} className='cell' onClick={() => this.clickGrid(r, c)}>
        {item}
        {level}
      </td>
    )
  }

  render() {
    let gridRows = rowNumbers.map((r) => {
      let cols = colLetters.map((c) => this.renderCell(r, c))
      return (
        <tr key={r} id={'row-' + r} className='map-row'>
          {cols}
        </tr>
      )
    })
    let itemDivs = items.map((item, idx) => {
      return (
        <span className="icon" key={item.icon} onClick={() => this.clickItem(idx)}>
          <img className={item.icon}></img>
        </span>
      )
    })
    let levelDivs = []
    for (let l = 1; l <= 9; l++) {
      levelDivs.push(
        <span className="level-icon" key={l} onClick={() => this.clickLevel(l)}>
          {l}
        </span>
      )
    }
    return (
      <div>
        <table>
          <tbody>
            {gridRows}
          </tbody>
        </table>
        <hr />
        <div className="items">
          {itemDivs}
        </div>
        <div className="level-icons">
          {levelDivs}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Helper />,
  document.getElementById('content')
);
