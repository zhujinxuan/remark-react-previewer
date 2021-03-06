# A markdown Previewer Component Supporting Auto-Scroll
A problem of most online markdown previewer is simply that the previewer does not follow the cursor.  
This previewer solves that problem by `unist` and `remark`. 

This previewer is a React Component providing markdown compied VDOM and auto-scroll feature.  Therefore, 
you can style it by `css` or by the provided interface `props.styles`.

## Demo
See [Demo at github pages](https://zhujinxuan.github.io/remark-react-previewer/), styled by `skeleton.css`.

## Usage
Just like other npm package
```
npm i --save remark-react-previewer
```
Then you can put the following code in JSX.
```js
<Previewer
    cursorPosition = {line, column}
    markdown = {string}
    />
```
For customizing styles, you could use css or pass an `styles:{tagName:cssInJS}` to props.  

- `props.styles` CSS in JS like [Radium](http://formidable.com/open-source/radium/) to style elements.  
  `props.styles` should be a nested Object like `props.styles = {tagName: cssInJS}`, where the `tagName`
  is 
  1. `li`, `h1` and other html tags
  2. `root` for the root `div`
  3. `scrolled` for the cursor matched element.



## On the Plan 
-  [ ] Passing a callback function for smoothie scroll~
 - [ ] FootNote Support
 - [ ] Clever Scroll for Code and Blockquote 
 - [ ] Editor Support as neovim-extension.  (Will be another package)
 - [ ] After Editor Support, A greasemonkey plugin for render markdown in rich-text editors like in quora and zhihu.

## For someone want to rebuild auto-scroll previewer on other frameworks
I write an [`unist` plugin](https://github.com/zhujinxuan/unist-find-node) to find the mdast node matching the cursor.  You may like it~

