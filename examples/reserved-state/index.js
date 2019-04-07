import { Value } from 'slate'
import { Editor } from 'slate-react'

import React from 'react'
import initialValue from './value.json'
import { Button, Icon, Toolbar } from '../components'

/**
 * The reserved-state example.
 *
 * @type {Component}
 */

class ReservedState extends React.Component {
  /**
   * Deserialize the initial editor value.
   *
   * @type {Object}
   */

  state = {
    value: Value.fromJSON(initialValue),
  }

  /**
   * Store a reference to the `editor`.
   *
   * @param {Editor} editor
   */

  ref = editor => {
    this.editor = editor
  }

  /**
   * Render the editor.
   *
   * @return {Component} component
   */

  render() {
    const { value } = this.state
    const { data } = value
    const undos = data.get('undos')
    const redos = data.get('redos')
    return (
      <div>
        <Toolbar>
          <div>
            <Button onMouseDown={this.onClickUndo}>
              <Icon>undo</Icon>
            </Button>
            <Button onMouseDown={this.onClickRedo}>
              <Icon>redo</Icon>
            </Button>
            <span>Undos: {undos ? undos.size : 0}</span>
            <span>Redos: {redos ? redos.size : 0}</span>
          </div>
          <br />
          <div>
            <span>Import</span>
            <input
              type="file"
              onChange={this.readFile}
            />
          </div>
          <br />
          <div>
            <Button onMouseDown={this.writeFile}>
              <Icon>import_export</Icon> Export State
            </Button>
          </div>
        </Toolbar>
        <Editor
          placeholder="Enter some text..."
          ref={this.ref}
          value={this.state.value}
          onChange={this.onChange}
        />
      </div>
    )
  }

  readFile = (event) => {
    var reader = new FileReader();
    var loadFunction = function(loadedEvent) {
      // result contains loaded file.
      var json = JSON.parse( loadedEvent.target.result );
      this.setState({
        value: Value.fromJSON(json)
      });
      console.log(json);
    }
    reader.onload = loadFunction.bind(this);
    reader.readAsText(event.target.files[0]);
  }

  writeFile = ( ) => {
    var filename = 'state.json';
    //var json = JSON.stringify( this.state.value.toJSON({ reserveState: true }) );
    var json = JSON.stringify( this.state.value.toJSON() );

    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(json));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
    console.log("Should be saved");
  }

  /**
   * On change.
   *
   * @param {Editor} editor
   */

  onChange = ({ value }) => {
    this.setState({ value })
  }

  /**
   * On redo in history.
   *
   */

  onClickRedo = event => {
    event.preventDefault()
    this.editor.redo()
  }

  /**
   * On undo in history.
   *
   */

  onClickUndo = event => {
    event.preventDefault()
    this.editor.undo()
  }
}

/**
 * Export.
 */

export default ReservedState
