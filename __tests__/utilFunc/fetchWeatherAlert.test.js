jest.mock('axios');
jest.mock('@sendgrid/mail');
import client from '@sendgrid/mail';
import axios from 'axios';
import millisToDate from '../../utilFunc/millisToDate.js';

client.setApiKey('testString');

const key = 'key';
const lang = 'en';


