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

pub fn naive_sum(values: &[i32]) -> i32 {
    values.iter().sum()
}

fn main() {
    let file_path = "../input1.txt";
    let lines = lines_from_file(file_path);

    let mut calories_per_elf: Vec<i32> = Vec::new();
    let mut rich_elf_cal = 0;
    let mut current_sum = 0;
    for line in lines {
        if line == "" {
            calories_per_elf.push(current_sum);
            if current_sum > rich_elf_cal {
                rich_elf_cal = current_sum;
            }
            current_sum = 0;
        } else {
            let line_value = line.parse::<i32>().unwrap();
            current_sum += line_value;
        }
    }
    calories_per_elf.push(current_sum);
    if current_sum > rich_elf_cal {
        rich_elf_cal = current_sum;
    }

    println!("Richest elf: {rich_elf_cal}");
    calories_per_elf.sort_by(|a, b| b.cmp(a));
    let top_three_elves: &[i32] = &calories_per_elf[..3];
    let sum = naive_sum(top_three_elves);
    println!("Top three elves: {:?} Total: {:?}", top_three_elves, sum);
}
