<?php

namespace App\Components;
// Генератор пседонимов для базы данных
class Alias
{
  public function createAlias($alias_table, $prefix, $cols)
  {
    $columns = [];
    $alias = [];
    foreach ($cols as $col) {
      array_push($columns, "$alias_table.$col");
      array_push($alias, $prefix . "_$col");
    }

    $result = array_combine($columns, $alias);
    return $result; // 'Table_1.id' => 'one_id'
  }

  // псевдонимы для джойнов
  public function aliasJoin($cols)
  {
    $alias1 = $this->createAlias('Table_1', 'one', $cols[0]); // posts
    $alias2 = $this->createAlias('Table_2', 'two', $cols[1]); // categories
    return $alias1 + $alias2;
  }

  // псевдонимы для постов с главной страницы
  public function aliasOneTable($cols)
  {
    return $this->createAlias('table', 'two', $cols);
  }
}


