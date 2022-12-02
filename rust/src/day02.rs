use std::collections::HashMap;
use std::fs::File;
use std::io::BufRead;
use std::io::BufReader;
use std::path::Path;

fn lines_from_file(filename: impl AsRef<Path>) -> Vec<String> {
    let file = File::open(filename).expect("no such file");
    let buf = BufReader::new(file);
    buf.lines()
        .map(|l| l.expect("Could not parse line"))
        .collect()
}

fn solve_fight(move1: &str, move2: &str) -> i32 {
    let move_values = HashMap::from([("rock", 1), ("paper", 2), ("scissors", 3)]);
    let move_value = move_values.get(move1).copied().unwrap_or(0);
    let outcome: i32;
    if move1 == move2 {
        return move_value + 3;
    }
    if move1 == "rock" {
        if move2 == "paper" {
            outcome = 0;
        } else {
            outcome = 6;
        }
    } else if move1 == "paper" {
        if move2 == "scissors" {
            outcome = 0;
        } else {
            outcome = 6;
        }
    } else {
        if move2 == "rock" {
            outcome = 0;
        } else {
            outcome = 6;
        }
    }
    return outcome + move_value;
}

fn main() {
    let file_path = "../2022/input2.txt";
    let lines = lines_from_file(file_path);

    let decoded_moves = HashMap::from([
        ("A", "rock"),
        ("B", "paper"),
        ("C", "scissors"),
        ("X", "rock"),
        ("Y", "paper"),
        ("Z", "scissors"),
    ]);

    let mut total_score = 0;
    for line in &lines {
        let parts = line.split_whitespace().collect::<Vec<&str>>();

        let enemy_move = decoded_moves.get(parts[0]).copied().unwrap_or("N/A");
        let my_move = decoded_moves.get(parts[1]).copied().unwrap_or("N/A");
        // println!("Enemy: {:?} Me: {:?}", enemy_move, my_move);
        // println!("Round result {:?}", solve_fight(my_move, enemy_move));
        total_score += solve_fight(my_move, enemy_move);
    }
    println!("Part 1 total score: {:?}", total_score);

    let calculate_moves = HashMap::from([
        ("rockX", "scissors"),
        ("rockY", "rock"),
        ("rockZ", "paper"),
        ("paperX", "rock"),
        ("paperY", "paper"),
        ("paperZ", "scissors"),
        ("scissorsX", "paper"),
        ("scissorsY", "scissors"),
        ("scissorsZ", "rock"),
    ]);

    total_score = 0;
    for line in &lines {
        let parts = line.split_whitespace().collect::<Vec<&str>>();
        let enemy_move = decoded_moves.get(parts[0]).copied().unwrap_or("N/A");
        let combination_move = enemy_move.to_string() + parts[1];

        let my_move = calculate_moves
            .get(&combination_move.as_str())
            .copied()
            .unwrap_or("N/A");
        total_score += solve_fight(my_move, enemy_move);

        // println!(
        //     "Combo move: {:?} so I should play: {:?}",
        //     combination_move, my_move
        // );
    }

    println!("Part 2 total score: {:?}", total_score);
}
