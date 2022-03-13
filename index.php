<?php
file_get_contents(
    'https://d.toolup.dev?d=' . json_encode(
        [
            'file' => __FILE__ . ':' . __LINE__,
            'data' => 11,
        ]
    ));
