<?php
namespace Composer\Installers;

class EliasisInstaller extends BaseInstaller
{
    protected $locations = array(
        'component' => 'Components/{$name}/',
        'module'    => 'modules/{$name}/',
        'plugin'    => 'plugins/{$name}/',
        'template'  => 'templates/{$name}/',
    );
}
