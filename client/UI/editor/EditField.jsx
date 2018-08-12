import React from 'react';
import TextField from '@material-ui/core/TextField';
import { fileUpload, saveWoerterbuchImage } from '../../../common/methods';

function retrieveImageFromClipboardAsBlob(pasteEvent, callback) {
    if(pasteEvent.clipboardData == false) {
        if(typeof(callback) == "function") {
            callback(undefined);
        }
    }
    const items = pasteEvent.clipboardData.items;
    if(items == undefined) {
        if(typeof(callback) == "function") {
            callback(undefined);
        }
    }
    for(let i=0;i< items.length;i++) {
        if(items[i].type.indexOf("image") == -1) continue;
        let blob = items[i].getAsFile();
        if(typeof(callback) == "function") {
            callback(blob);
        }
    }
}

class EditField extends React.Component {
    componentDidMount() {
        window.addEventListener("paste", this.onPaste, false);
        if(this.props.data) {
            this.setState({
                content: this.props.data
            });
        }
    }
    componentWillUnmount() {
        window.removeEventListener("paste", this.onPaste)
    }
    onPaste = (e) => {
        retrieveImageFromClipboardAsBlob(e, (imgBlob) => {
            fileUpload([imgBlob], "1", saveWoerterbuchImage, (res) => {
                let content = this.state.content;
                content += "<img src=\"" + res.filename + "\" />";
                this.setState({
                    content: content
                });
                let v = {
                    target: {
                        value: content
                    }
                }
                this.props.setter(v);
            });
        });
    }
    state = {
        content: ''
    }
    onChange = (e) => {
        this.setState({
            content: e.target.value
        });
        this.props.setter(e);
    }
    render() {
        return(
            <TextField
                multiline
                rowsMax={8}
                rows={8}
                fullWidth
                onChange={this.onChange}
                placeholder="Inhalt"
                value={this.state.content}
            />
        )
    }
}

export default EditField;