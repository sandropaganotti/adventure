import Item from '../js/item.js';
import guybrushSprites from './sprites/guybrush.js'; 

export default function(){
  
  describe('Item', () => {
     
    it('exists', () => {
      expect(Item).to.not.be.undefined;
    });
    
    it('create an item', () => {
      let guybrush = new Item({
        sprites: guybrushSprites()
      });
      
      expect(Object.keys(guybrush.sprites).length).to.be.equal(3);
    });

    it('position a sprite', done => {
      let guybrush = new Item({
        sprites: guybrushSprites()
      });
      guybrush.build().then((item) => {
        item.still({key: 'waiting', x: 50, y: 50});
        item.tick({delta: 10});
        expect(item.sprite.sheet.sequence.key).to.be.equal(249);
        item.tick({delta: 1000});
        expect(item.sprite.sheet.sequence.key).to.be.equal(249);
        expect(item.sprite.frame.id).to.be.equal(0);
        done();
      });
    });
      
    it('moves a sprite', done => {
      let guybrush = new Item({
        sprites: guybrushSprites()
      });
      guybrush.build().then((item) => {
        item.move({key: 'walkingRight', speed: 2,fromX: 50, fromY: 50, toX: 100, toY: 100}).then(() => {
          expect(item.x).to.be.equal(100);
          expect(item.y).to.be.equal(100);
        }).then(done);
        item.tick({delta: 10});
        expect(Math.round(item.x)).to.be.equal(64);
        expect(Math.round(item.y)).to.be.equal(64);
        item.tick({delta: 1000});  
      });
    });
    
    it('allow to group sprites by direction', done => {
      let sprites = guybrushSprites();
      let guybrush = new Item({
        sprites: {
          walking: {
            left: sprites.walkingLeft,
            other: sprites.walkingRight
          }
        }
      });
      guybrush.build().then(item => {
        item.move({key: 'walking', speed: 2, fromX: 50, fromY: 50, toX: 110, toY: 100})
          .then(() => { 
            let newmove = item.move({toX: 50, toY: 100}); 
            expect(item.directions[0]).to.be.equal('left');
            newmove;
          })
          .then(done);

        expect(item.directions[0]).to.be.equal('right');
        item.tick({delta: 10000});
      });
    });
    
  });
  
}