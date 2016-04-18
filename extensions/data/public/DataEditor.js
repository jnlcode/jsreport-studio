const React = Studio.react
const TextEditor = Studio.TextEditor
const { Component } = Studio.react

export default class DataEditor extends Component {
  static propTypes = {
    entity: React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  }

  render () {
    const { entity, onUpdate } = this.props

    return (<TextEditor
      name={entity._id}
      mode='ejs'
      value={entity.dataJson}
      onUpdate={(v) => onUpdate(Object.assign({}, entity, {dataJson: v}))}
      />)
  }
}
