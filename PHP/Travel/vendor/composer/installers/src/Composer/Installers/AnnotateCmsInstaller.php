<?php
namespace Composer\Installers;

class AnnotateCmsInstaller extends BaseInstaller
{
    protected $locations = array(
        'module'    => 'addons/modules/{$name}/',
        'component' => 'addons/Components/{$name}/',
        'service'   => 'addons/services/{$name}/',
    );
}
