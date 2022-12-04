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
fn main() {
    let file_path = "../2022/input3.txt";
    let lines = lines_from_file(file_path);

    let mut char_values =
        ('a'..='z')
            .into_iter()
            .enumerate()
            .fold(HashMap::new(), |mut acc, (i, c)| {
                acc.insert(c, i + 1);
                acc
            });

    let values2 = ('A'..='Z')
        .into_iter()
        .enumerate()
        .fold(HashMap::new(), |mut acc, (i, c)| {
            acc.insert(c, i + 27);
            acc
        });

    char_values.extend(values2);

    println!("Values: {:?} ", char_values);

    let mut char_sum = 0;
    for line in &lines {
        let char_vec: Vec<char> = line.chars().collect();

        let part_a = &char_vec[0..char_vec.len() / 2];
        let part_b = &char_vec[(char_vec.len() / 2)..];

        let mut index = 0;
        for &c in part_a {
            let res = part_b.iter().position(|char| char == &c);
            if res.is_some() {
                index = res.unwrap();
                break;
            }
        }

        char_sum += char_values.get(&part_b[index]).unwrap();
    }
    println!("Part 1: {:?} ", char_sum);

    // Split elves into groups of three
    let groups = lines.chunks(3);
    char_sum = 0;
    for group in groups {
        // println!("Group: {:?} ", group);
        let first_elf = &group[0];
        for item in first_elf.chars() {
            let res1 = group[1].chars().position(|char| char == item);
            // println!("Item Res1: {:?} {:?} ", item, res1);
            if res1.is_some() {
                let res2 = group[2].chars().position(|char| char == item);
                // println!("Item Res2: {:?} {:?} ", item, res2);
                if res2.is_some() {
                    char_sum += char_values.get(&item).unwrap();
                    break;
                }
            }
        }
    }

    println!("Part 2: {:?} ", char_sum);
}
