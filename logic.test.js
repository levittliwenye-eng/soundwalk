import {test} from 'node:test';
import assert from 'node:assert/strict';
import {aggregateScores,pickMission,csvForNotes} from './dist/logic.js';
test('mean score uses every frame, rather than selecting the most confident frame',()=>{const output=aggregateScores([{classifications:[{categories:[{categoryName:'Bird',score:.8},{categoryName:'Rain',score:.1}]}]},{classifications:[{categories:[{categoryName:'Bird',score:.2},{categoryName:'Rain',score:.9}]}]}]);assert.equal(output[0].score,.5);assert.equal(output[1].score,.5);});
test('low evidence does not produce a confident bird mission',()=>assert.equal(pickMission([{label:'Bird',score:.03}]).title,'Find three layers of sound.'));
test('bird and traffic observations produce different outdoor listening tasks',()=>{assert.equal(pickMission([{label:'Bird vocalization, bird call, bird song',score:.7}]).title,'Listen beyond the birds.');assert.equal(pickMission([{label:'Traffic noise, roadway noise',score:.8}]).title,'Find a quieter listening stop.');});
test('CSV keeps quotes and newlines and neutralizes spreadsheet formulas',()=>{const csv=csvForNotes([{date:'today',title:'Bird',note:'=1+1',source:'hello,"world"\nnext',scores:[{score:.3}]}]);assert.ok(csv.includes('"\'=1+1"'));assert.ok(csv.includes('"hello,""world""\nnext"'));});
test('missing frames and invalid scores are ignored',()=>assert.deepEqual(aggregateScores([{classifications:[]},{classifications:[{categories:[{categoryName:'Bird',score:NaN}]}]}]),[]));
