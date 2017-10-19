import { Participant } from '../../../shared/model/participant';
import { dbParticipants } from '../db-data';
import * as _ from 'lodash';

export function findDbParticipant(participantId: number): Participant {
  return _.find(dbParticipants, (participant: Participant) => participant.id === participantId);
}