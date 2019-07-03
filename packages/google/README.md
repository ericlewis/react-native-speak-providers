# `Google`

A GoogleTTS Speech Provider

## Usage

```javascript
import { GoogleProvider } from '@react-native-speak/google';

const google = new GoogleProvider('SUPERSECRET');

const speech = new Speech([google]);
speech.speak('Hello');
```
