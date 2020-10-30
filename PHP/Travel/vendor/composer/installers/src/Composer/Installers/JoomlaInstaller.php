<?php
namespace Composer\Installers;

class JoomlaInstaller extends BaseInstaller
{
    protected $locations = array(
        'component'    => 'Components/{$name}/',
        'module'       => 'modules/{$name}/',
        'template'     => 'templates/{$name}/',
        'plugin'       => 'plugins/{$name}/',
        'library'      => 'libraries/{$name}/',
    );

    // TODO: Add inflector for mod_ and com_ names
}
