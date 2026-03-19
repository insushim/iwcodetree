export const toolbox = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "동작",
      colour: "230",
      contents: [
        {
          kind: "block",
          type: "move_steps",
          inputs: {
            STEPS: { shadow: { type: "math_number", fields: { NUM: 10 } } },
          },
        },
        {
          kind: "block",
          type: "turn_right",
          inputs: {
            DEGREES: { shadow: { type: "math_number", fields: { NUM: 15 } } },
          },
        },
        {
          kind: "block",
          type: "turn_left",
          inputs: {
            DEGREES: { shadow: { type: "math_number", fields: { NUM: 15 } } },
          },
        },
        {
          kind: "block",
          type: "goto_xy",
          inputs: {
            X: { shadow: { type: "math_number", fields: { NUM: 0 } } },
            Y: { shadow: { type: "math_number", fields: { NUM: 0 } } },
          },
        },
        {
          kind: "block",
          type: "glide_to_xy",
          inputs: {
            SECS: { shadow: { type: "math_number", fields: { NUM: 1 } } },
            X: { shadow: { type: "math_number", fields: { NUM: 0 } } },
            Y: { shadow: { type: "math_number", fields: { NUM: 0 } } },
          },
        },
        {
          kind: "block",
          type: "point_direction",
          inputs: {
            DIRECTION: { shadow: { type: "math_number", fields: { NUM: 90 } } },
          },
        },
        { kind: "block", type: "point_towards" },
        {
          kind: "block",
          type: "change_x",
          inputs: {
            DX: { shadow: { type: "math_number", fields: { NUM: 10 } } },
          },
        },
        {
          kind: "block",
          type: "change_y",
          inputs: {
            DY: { shadow: { type: "math_number", fields: { NUM: 10 } } },
          },
        },
        {
          kind: "block",
          type: "set_x",
          inputs: {
            X: { shadow: { type: "math_number", fields: { NUM: 0 } } },
          },
        },
        {
          kind: "block",
          type: "set_y",
          inputs: {
            Y: { shadow: { type: "math_number", fields: { NUM: 0 } } },
          },
        },
        { kind: "block", type: "bounce_on_edge" },
        { kind: "block", type: "x_position" },
        { kind: "block", type: "y_position" },
        { kind: "block", type: "direction_value" },
      ],
    },
    {
      kind: "category",
      name: "형태",
      colour: "290",
      contents: [
        {
          kind: "block",
          type: "say_for_secs",
          inputs: {
            TEXT: { shadow: { type: "text", fields: { TEXT: "안녕!" } } },
            SECS: { shadow: { type: "math_number", fields: { NUM: 2 } } },
          },
        },
        {
          kind: "block",
          type: "say",
          inputs: {
            TEXT: { shadow: { type: "text", fields: { TEXT: "안녕!" } } },
          },
        },
        {
          kind: "block",
          type: "think_for_secs",
          inputs: {
            TEXT: { shadow: { type: "text", fields: { TEXT: "흠..." } } },
            SECS: { shadow: { type: "math_number", fields: { NUM: 2 } } },
          },
        },
        {
          kind: "block",
          type: "think",
          inputs: {
            TEXT: { shadow: { type: "text", fields: { TEXT: "흠..." } } },
          },
        },
        {
          kind: "block",
          type: "switch_costume",
          inputs: {
            COSTUME: { shadow: { type: "math_number", fields: { NUM: 1 } } },
          },
        },
        { kind: "block", type: "next_costume" },
        {
          kind: "block",
          type: "switch_backdrop",
          inputs: {
            BACKDROP: { shadow: { type: "math_number", fields: { NUM: 1 } } },
          },
        },
        { kind: "block", type: "next_backdrop" },
        {
          kind: "block",
          type: "change_size_by",
          inputs: {
            SIZE: { shadow: { type: "math_number", fields: { NUM: 10 } } },
          },
        },
        {
          kind: "block",
          type: "set_size_to",
          inputs: {
            SIZE: { shadow: { type: "math_number", fields: { NUM: 100 } } },
          },
        },
        {
          kind: "block",
          type: "set_effect",
          inputs: {
            VALUE: { shadow: { type: "math_number", fields: { NUM: 25 } } },
          },
        },
        { kind: "block", type: "clear_effects" },
        { kind: "block", type: "show_sprite" },
        { kind: "block", type: "hide_sprite" },
        { kind: "block", type: "go_to_layer" },
        { kind: "block", type: "size_value" },
        { kind: "block", type: "costume_name" },
        { kind: "block", type: "costume_number" },
      ],
    },
    {
      kind: "category",
      name: "소리",
      colour: "330",
      contents: [
        { kind: "block", type: "play_sound" },
        { kind: "block", type: "play_sound_wait" },
        { kind: "block", type: "stop_all_sounds" },
        {
          kind: "block",
          type: "change_volume",
          inputs: {
            VOLUME: { shadow: { type: "math_number", fields: { NUM: -10 } } },
          },
        },
        {
          kind: "block",
          type: "set_volume",
          inputs: {
            VOLUME: { shadow: { type: "math_number", fields: { NUM: 100 } } },
          },
        },
        { kind: "block", type: "volume_value" },
        {
          kind: "block",
          type: "play_note",
          inputs: {
            NOTE: { shadow: { type: "math_number", fields: { NUM: 60 } } },
            BEATS: { shadow: { type: "math_number", fields: { NUM: 0.5 } } },
          },
        },
      ],
    },
    {
      kind: "category",
      name: "이벤트",
      colour: "45",
      contents: [
        { kind: "block", type: "when_flag_clicked" },
        { kind: "block", type: "when_key_pressed" },
        { kind: "block", type: "when_sprite_clicked" },
        { kind: "block", type: "when_backdrop_switch" },
        {
          kind: "block",
          type: "broadcast_msg",
          inputs: {
            MSG: { shadow: { type: "text", fields: { TEXT: "메시지1" } } },
          },
        },
        {
          kind: "block",
          type: "broadcast_msg_wait",
          inputs: {
            MSG: { shadow: { type: "text", fields: { TEXT: "메시지1" } } },
          },
        },
        { kind: "block", type: "when_receive_msg" },
      ],
    },
    {
      kind: "category",
      name: "제어",
      colour: "30",
      contents: [
        {
          kind: "block",
          type: "wait_secs",
          inputs: {
            SECS: { shadow: { type: "math_number", fields: { NUM: 1 } } },
          },
        },
        {
          kind: "block",
          type: "repeat_times",
          inputs: {
            TIMES: { shadow: { type: "math_number", fields: { NUM: 10 } } },
          },
        },
        { kind: "block", type: "forever_loop" },
        { kind: "block", type: "if_then" },
        { kind: "block", type: "if_then_else" },
        { kind: "block", type: "wait_until" },
        { kind: "block", type: "repeat_until" },
        { kind: "block", type: "stop_script" },
        { kind: "block", type: "create_clone_of" },
        { kind: "block", type: "when_clone_start" },
        { kind: "block", type: "delete_this_clone" },
      ],
    },
    {
      kind: "category",
      name: "감지",
      colour: "190",
      contents: [
        { kind: "block", type: "touching_target" },
        { kind: "block", type: "touching_color" },
        {
          kind: "block",
          type: "ask_and_wait",
          inputs: {
            QUESTION: {
              shadow: { type: "text", fields: { TEXT: "이름이 뭐야?" } },
            },
          },
        },
        { kind: "block", type: "answer_value" },
        { kind: "block", type: "mouse_x_value" },
        { kind: "block", type: "mouse_y_value" },
        { kind: "block", type: "mouse_down_bool" },
        { kind: "block", type: "key_pressed_bool" },
        { kind: "block", type: "distance_to" },
        { kind: "block", type: "timer_value" },
        { kind: "block", type: "reset_timer" },
        { kind: "block", type: "current_datetime" },
      ],
    },
    {
      kind: "category",
      name: "연산",
      colour: "120",
      contents: [
        {
          kind: "block",
          type: "math_add",
          inputs: {
            A: { shadow: { type: "math_number", fields: { NUM: "" } } },
            B: { shadow: { type: "math_number", fields: { NUM: "" } } },
          },
        },
        {
          kind: "block",
          type: "math_subtract",
          inputs: {
            A: { shadow: { type: "math_number", fields: { NUM: "" } } },
            B: { shadow: { type: "math_number", fields: { NUM: "" } } },
          },
        },
        {
          kind: "block",
          type: "math_multiply",
          inputs: {
            A: { shadow: { type: "math_number", fields: { NUM: "" } } },
            B: { shadow: { type: "math_number", fields: { NUM: "" } } },
          },
        },
        {
          kind: "block",
          type: "math_divide",
          inputs: {
            A: { shadow: { type: "math_number", fields: { NUM: "" } } },
            B: { shadow: { type: "math_number", fields: { NUM: "" } } },
          },
        },
        {
          kind: "block",
          type: "random_from_to",
          inputs: {
            FROM: { shadow: { type: "math_number", fields: { NUM: 1 } } },
            TO: { shadow: { type: "math_number", fields: { NUM: 10 } } },
          },
        },
        {
          kind: "block",
          type: "compare_gt",
          inputs: {
            A: { shadow: { type: "math_number", fields: { NUM: "" } } },
            B: { shadow: { type: "math_number", fields: { NUM: 50 } } },
          },
        },
        {
          kind: "block",
          type: "compare_lt",
          inputs: {
            A: { shadow: { type: "math_number", fields: { NUM: "" } } },
            B: { shadow: { type: "math_number", fields: { NUM: 50 } } },
          },
        },
        {
          kind: "block",
          type: "compare_eq",
          inputs: {
            A: { shadow: { type: "math_number", fields: { NUM: "" } } },
            B: { shadow: { type: "math_number", fields: { NUM: 50 } } },
          },
        },
        { kind: "block", type: "logic_and" },
        { kind: "block", type: "logic_or" },
        { kind: "block", type: "logic_not" },
        {
          kind: "block",
          type: "join_strings",
          inputs: {
            A: { shadow: { type: "text", fields: { TEXT: "안녕 " } } },
            B: { shadow: { type: "text", fields: { TEXT: "세상" } } },
          },
        },
        {
          kind: "block",
          type: "letter_of_string",
          inputs: {
            STRING: { shadow: { type: "text", fields: { TEXT: "안녕" } } },
            INDEX: { shadow: { type: "math_number", fields: { NUM: 1 } } },
          },
        },
        {
          kind: "block",
          type: "length_of_string",
          inputs: {
            STRING: { shadow: { type: "text", fields: { TEXT: "안녕" } } },
          },
        },
        {
          kind: "block",
          type: "string_contains",
          inputs: {
            STRING: { shadow: { type: "text", fields: { TEXT: "사과" } } },
            SUBSTR: { shadow: { type: "text", fields: { TEXT: "과" } } },
          },
        },
        {
          kind: "block",
          type: "math_mod",
          inputs: {
            A: { shadow: { type: "math_number", fields: { NUM: "" } } },
            B: { shadow: { type: "math_number", fields: { NUM: "" } } },
          },
        },
        {
          kind: "block",
          type: "math_round",
          inputs: {
            NUM: { shadow: { type: "math_number", fields: { NUM: "" } } },
          },
        },
        {
          kind: "block",
          type: "math_function",
          inputs: {
            NUM: { shadow: { type: "math_number", fields: { NUM: "" } } },
          },
        },
      ],
    },
    {
      kind: "category",
      name: "변수",
      colour: "20",
      contents: [
        {
          kind: "block",
          type: "set_variable",
          inputs: {
            VALUE: { shadow: { type: "math_number", fields: { NUM: 0 } } },
          },
        },
        {
          kind: "block",
          type: "change_variable",
          inputs: {
            VALUE: { shadow: { type: "math_number", fields: { NUM: 1 } } },
          },
        },
        { kind: "block", type: "variable_get" },
      ],
    },
    {
      kind: "category",
      name: "펜",
      colour: "160",
      contents: [
        { kind: "block", type: "pen_clear" },
        { kind: "block", type: "pen_stamp" },
        { kind: "block", type: "pen_down" },
        { kind: "block", type: "pen_up" },
        { kind: "block", type: "set_pen_color" },
        {
          kind: "block",
          type: "set_pen_size",
          inputs: {
            SIZE: { shadow: { type: "math_number", fields: { NUM: 1 } } },
          },
        },
      ],
    },
    {
      kind: "category",
      name: "나만의 블록",
      colour: "300",
      contents: [
        { kind: "block", type: "procedures_defnoreturn" },
        { kind: "block", type: "procedures_callnoreturn" },
      ],
    },
  ],
};
