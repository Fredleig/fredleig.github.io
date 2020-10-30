<?php

namespace App\Components;


use Aura\SqlQuery\QueryFactory;
use PDO;


class Database
{
  public $builder;
  public $pdo;
  private $alias;

  public function __construct(QueryFactory $builder, PDO $pdo, Alias $alias)
  {
    $this->builder = $builder;
    $this->pdo = $pdo;
    $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // изменяем что бы показывал ошибки SQL
    $this->alias = $alias;
  }

  // Получить массив строк
  private function myFetchAll($select)
  {
    $sth = $this->pdo->prepare($select->getStatement());
    $sth->execute($select->getBindValues());
    $result = $sth->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }
  //  Получить 1 строку
  private function myFetch($select)
  {
    $sth = $this->pdo->prepare($select->getStatement());
    $sth->execute($select->getBindValues());
    $result = $sth->fetch(PDO::FETCH_ASSOC);
    return $result;
  }
  // ----------------------------------------------------------------------------------------------------------------//

  // Добавление данных в таблицу
  public function add($table, $data)
  {
    $insert = $this->builder->newInsert();
    $insert->into($table)->cols($data);

    $sth = $this->pdo->prepare($insert->getStatement());
    $sth->execute($insert->getBindValues());
  }

  //  Получить 1 запись
  public function getOne($table, $id)
  {
    $select = $this->builder->newSelect();
    $select->cols(['*'])->from($table)->where('id=:id')->bindValues(['id' => $id]);

    return $this->myFetch($select);
  }

  //  Обвноление записи
  public function update($table, $id, $data)
  {
    $update = $this->builder->newUpdate();
    $update->table($table)->cols($data)->where('id = :id')->bindValues(['id' => $id]);
    $sth = $this->pdo->prepare($update->getStatement());
    $sth->execute($update->getBindValues());
  }

  //  Удаление записи
  public function delete($table, $whereCol, $value)
  {
    $delete = $this->builder->newDelete();
    $delete->from($table)->where("$whereCol :val")->bindValues(['val' => $value]);

    $sth = $this->pdo->prepare($delete->getStatement());
    $sth->execute($delete->getBindValues());
  }
  // ------------------------------------------Вспомогательные-------------------------------------------------------//

  // Получить 1 или несколько колонок с фильтром (Самая универсальная наверно можно все перехерачить наверно ей)
  public function getArrayCol($table, $col = ['*'], $whereCol = false, $val = false)
  {
    $select = $this->builder->newSelect();
    $select->cols($col)->from($table);
    if ($whereCol && $val || $val === 0) $select->where("$whereCol :val")->bindValues(['val' => $val]);

    return $this->myFetchAll($select);
  }

  // Получить данные из 2 таблиц
  public function join($cols, $table, $key)
  {
    // Создаем псевдонимы
    $alias = $this->alias->aliasJoin($cols);

    $select = $this->builder->newSelect();
    $select->cols($alias)
        ->from("$table[0] AS Table_1")
        ->join('INNER', "$table[1] AS Table_2", "Table_1.$key[0] = Table_2.$key[1]");

    return $this->myFetchAll($select);
  }

  // Получить все записи из 2 таблиц с фиьтром (Результат в функции ниже)
  private function getTwoTablesFilter($cols, $table, $key, $whereCol, $value)
  {
    // Создаем псевдонимы
    $alias = $this->alias->aliasJoin($cols);

    $select = $this->builder->newSelect();
    $select->cols($alias)
        ->from("$table[0] AS Table_1")
        ->join('INNER', "$table[1] AS Table_2", "Table_1.$key[0] = Table_2.$key[1]")
        ->where("Table_1.$whereCol = :val")
        ->bindValues(['val' => $value]);

    $sth = $this->pdo->prepare($select->getStatement());
    $sth->execute($select->getBindValues());
    return $sth;
  }

  // Получить все записи из 2 таблиц с фильтром
  public function joinFilter($cols, $table, $key, $whereCol, $value)
  {
    $sth = $this->getTwoTablesFilter($cols, $table, $key, $whereCol, $value);
    $result = $sth->fetchAll(PDO::FETCH_ASSOC);
    return $result;
  }

  // Получить одну запись из 2 таблиц
  public function joinOne($cols, $table, $key, $whereCol, $value)
  {
    $sth = $this->getTwoTablesFilter($cols, $table, $key, $whereCol, $value);
    $result = $sth->fetch(PDO::FETCH_ASSOC);
    return $result;
  }

// ----------------------------------------------Пагинация---------------------------------------------//

  // Получить колличество записей
  public function getCount($table, $whereCol = false, $val = false)
  {
    $select = $this->builder->newSelect();
    $select->cols(['COUNT(*) AS count'])->from($table);
    if ($whereCol && $val || $val === 0) $select->where("$whereCol :val")->bindValues(['val' => $val]);

    $sth = $this->pdo->prepare($select->getStatement());
    $sth->execute($select->getBindValues());
    $result = $sth->fetch(PDO::FETCH_ASSOC)['count'];
    return $result;
  }

  // Получить все записи с пагинацией (из 1 таблицы)
  public function allPaginate($table, $cols, $offset = 1, $limit = 1, $whereCol = false, $val = false)
  {
    if ($cols[0] !== '*') $cols = $this->alias->aliasOneTable($cols);

    $select = $this->builder->newSelect();

    if (!$whereCol && !$val) {
      $select
          ->cols((array)$cols)
          ->from("$table AS table")
          ->page($offset)
          ->setPaging($limit);
    } else {
      $select
          ->cols((array)$cols)
          ->from("$table AS table")
          ->where("$whereCol :val")
          ->bindValues(['val' => $val])
          ->page($offset)
          ->setPaging($limit);
    }
    return $this->myFetchAll($select);
  }

  // Получить все записи из 2 таблиц c пагинацией и фильтром
  public function paginJoinFilter($cols, $table, $key, $whereCol, $value, $offset = 1, $limit = 1)
  {
    // Создаем псевдонимы
    $alias = $this->alias->aliasJoin($cols);

    $select = $this->builder->newSelect();
    $select->cols($alias)
        ->from("$table[0] AS Table_1")
        ->join('INNER', "$table[1] AS Table_2", "Table_1.$key[0] = Table_2.$key[1]")
        ->where("Table_1.$whereCol =?", $value)
        ->page($offset)
        ->setPaging($limit);

    return $this->myFetchAll($select);
  }
}