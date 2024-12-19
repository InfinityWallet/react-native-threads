import 'react-native-get-random-values'; // Ensures `getRandomValues` is shimmed
import process from 'process';
import { install } from 'react-native-quick-crypto';

// Assign polyfills to global

global.process = global.process || process;
install();

// Optional: Additional polyfills for Node.js modules (if needed)
global.stream = require('readable-stream');
global.events = require('events');
global.util = require('util');
global.assert = require('assert');
