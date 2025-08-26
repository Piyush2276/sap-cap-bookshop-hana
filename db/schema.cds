namespace my.bookshop;

using {
  cuid,
  managed
} from '@sap/cds/common';

entity Authors : cuid, managed {
  name        : String(111);
  books       : Association to many Books on books.author = $self;
}

entity Books : cuid, managed {
  title       : String(255);
  genre       : String(50);
  stock       : Integer;
  price       : Decimal(9,2);
  author      : Association to Authors;
}
