import { writeFile} from 'fs';
import { promisify } from 'util';
import Queue from 'bull/lib/queue';
import ObjectId from 'mongodb';
import dbClient from './utils/db';
import Mailer from '.utils/mailer';

const fetchId = new ObjectId();

