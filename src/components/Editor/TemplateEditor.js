import React, {Component} from 'react'
import TextEditor from './TextEditor.js'
import 'brace/mode/handlebars'
import 'brace/mode/javascript'
import 'brace/theme/chrome'
import 'brace/ext/searchbox'
import _debounce from 'lodash/debounce'
import Studio from '../../Studio.js'
import SplitPane from '../../components/common/SplitPane/SplitPane.js'

export default class TemplateEditor extends Component {
  static propTypes = {
    entity: React.PropTypes.object.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  }

  constructor () {
    super()
    this.handleSplitChanged = _debounce(this.handleSplitChanged, 150, { leading: true })
  }

  handleSplitChanged () {
    Studio.triggerSplitResize()
  }

  render () {
    const { entity, onUpdate } = this.props

    return (
      <SplitPane
        split='horizontal' resizerClassName='resizer-horizontal' onChange={() => this.handleSplitChanged()}
        defaultSize={(window.innerHeight * 0.4) + 'px'}>
        <TextEditor
          key={entity._id}
          name={entity._id}
          mode='handlebars'
          onUpdate={(v) => onUpdate(Object.assign({}, entity, {content: v}))}
          value={entity.content}
          />
        <TextEditor
          name={entity._id + '_helpers'}
          key={entity._id + '_helpers'}
          mode='javascript'
          onUpdate={(v) => onUpdate(Object.assign({}, entity, {helpers: v}))}
          value={entity.helpers}
          />
      </SplitPane>
    )
  }
}