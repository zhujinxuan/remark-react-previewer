# A markdown Previewer Supporting Auto-Scroll
A problem of most online markdown previewer is simply that the previewer does not follow the cursor.  
This previewer solves that problem by `unist` and `remark`.

## Usage
```js
<Previewer
    cursorPosition = {line, column}
    markdown = {string}
    />
```
For customizing styles, you could use css or pass an `styles:{tagName:cssInJS}` to props.  
  - `props.styles` CSS in JS like [http://formidable.com/open-source/radium/](Radium) to style elements.  
  `props.styles` should be a nested Object like `props.styles = {tagName: cssInJS}`, where the `tagName`
  is the tagName like `li`, `h1`, `root` for the root `div`, or `scrolled` for the cursor matched element.

## Demo
On working

## On the Plan 
 - [ ] FootNote Support
 - [ ] Editor Support as neovim-extension.
 - [ ] After Editor Support, A greasemonkey plugin for render markdown in rich-text editors like in quora and zhihu.

## For someone want to rebuild auto-scroll previewer on other frameworks
I write an [`unist` plugin](https://github.com/zhujinxuan/unist-find-node) to find the mdast node matching the cursor.  You may like it~

