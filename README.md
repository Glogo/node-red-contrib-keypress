# node-red-contrib-keypress
A <a href="http://nodered.org" target="_new">Node-RED</a> node capturing keypress input in terminal

## Install
Run the following command in your Node-RED user directory - typically `~/.node-red`
```
npm i node-red-contrib-keypress
```
Or install it globally
```
sudo npm i -g node-red-contrib-keypress
```

## Sample node messages
```
{
	key: "up"
}
```
```
{
	key: "a"
}
```

## Keys mapping
Keypress Node supports following sample keys mapping:
```
up, down, left, right, space, backspace, return, escape, a, b, c, d, ..., 1, 2, 3, ...
```
If you do not specify input key, all keys will be captured. Insert debug node to see all captured keys mappings.

Shift & ctrl capturing is currently not supported due to inconsistencies in different terminals (TODO).

**Note:** Keypress capturing works only when terminal window where you started node-red is in the front. If your terminal does not support ttty, you will see keys output in terminal.

### Example
Simple flow to capture keyboard arrows input

```
[{"id":"f9172ee0.b0107","type":"keypress","z":"1bc8013.5b95eff","key":"","x":120,"y":140,"wires":[["800f4214.80701"]]}]
```
