# `Polly`

An AWS Polly Speech Provider

## Usage

```javascript
import { PollyProvider } from '@react-native-speak/polly';

const polly = new PollyProvider({
  signatureVersion: 'v4',
  region: 'us-east-1',
  accessKeyId: 'ACCESSKEYID',
  secretAccessKey: 'SUPERSECRETSAUCE',
});

const speech = new Speech([polly]);
speech.speak('Hello');
```
