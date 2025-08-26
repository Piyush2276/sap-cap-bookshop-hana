using my.bookshop as db from '../db/schema';


service CatalogService {
  @requires: 'viewer'
 entity Books as projection on db.Books;

 entity Author as projection on db.Authors;
}
