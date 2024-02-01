<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected function getAjax($uri, array $headers = [])
    {
        $headers['X-Requested-With'] = 'XMLHttpRequest';

        return $this->get($uri, $headers);
    }

    protected function postAjax($uri, array $data = [], array $headers = [])
    {
        $headers['X-Requested-With'] = 'XMLHttpRequest';

        return $this->post($uri, $data, $headers);
    }

    protected function putAjax($url, array $data = [], array $headers = [])
    {
        $headers['X-Requested-With'] = 'XMLHttpRequest';

        return $this->put($url, $data, $headers);
    }
}
