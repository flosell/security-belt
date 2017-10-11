const sinon = require('sinon');
const assert = require('assert');
const composer = require('../src/server/composer');
const state = require('../src/server/state');

describe('Composer', () => {
  describe('getTeamRepresentation', () => {
    it('should return the right team', async () => {
      sinon.stub(state, 'getTeam').returns({
        name: 'Team 1',
        belt: 'white',
        skillCount: 1,
        skills: [
          { fileName: 'my-skill', title: 'My skill' }
        ]
      });
      sinon.stub(state, 'getBadges').returns([
        { title: 'My badge', requiredSkills: ['my-skill'] }
      ]);
      const teamname = 'Team 1';
      const result = await composer.getTeamRepresentation(teamname);
      assert.equal(result.id, 'team-1');
      assert.equal(result.name, teamname);
      assert.equal(result.belt, 'white');
      assert.equal(result.skillCount, 1);
      assert.deepEqual(result.skills, [
        { title: 'My skill', id: 'my-skill' }
      ]);
      assert.deepEqual(result.badges, [
        {
          id: 'my-badge',
          isComplete: false,
          title: 'My badge',
          requiredSkills: [
            { id: 'my-skill' }
          ]
        }
      ]);
    });
  });
});