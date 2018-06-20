export default function(context) {
  context.document.showMessage("It's alive 🙌")
  var document = Document.getSelectedDocument()
  document.pages.forEach(page => {
    console.log(page)
  })
}

console.log('This is an example Sketch script.')

var sketch = require('sketch')
var UI =  require('sketch/ui')
var DOM =  require('sketch/dom')

var options = []

var document = sketch.getSelectedDocument()



document.pages.forEach((layer, i) => options[i] = (layer.name))
/*
var selection = UI.getSelectionFromUser(
  "Which page do you want to export?",
  options
)

var [_, idx, ok] = selection

if (!ok) {
 console.log(selection)
} else {
  DOM.export(document.pages[idx].layers, {formats: 'svg'})
}
*/

var _ = f => f
var savePanel = NSSavePanel.savePanel();

        savePanel.setTitle(_("Export colors"));
        savePanel.setNameFieldLabel(_("Export to:"));
        savePanel.setPrompt(_("Export"));
        savePanel.setCanCreateDirectories(true);
        savePanel.setShowsTagField(false);
        savePanel.setAllowedFileTypes(NSArray.arrayWithObject("json"));
        savePanel.setAllowsOtherFileTypes(false);
        savePanel.setNameFieldStringValue("-colors.json");

        if (savePanel.runModal() != NSOKButton) {
            return false;
        }
        var savePath = savePanel.URL().path().stringByDeletingLastPathComponent(),
            fileName = savePanel.URL().path().lastPathComponent();
