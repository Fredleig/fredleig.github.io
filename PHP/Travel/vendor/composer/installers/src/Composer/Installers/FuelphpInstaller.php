<?php
namespace Composer\Installers;

class FuelphpInstaller extends BaseInstaller
{
    protected $locations = array(
        'component'  => 'Components/{$name}/',
    );
}
