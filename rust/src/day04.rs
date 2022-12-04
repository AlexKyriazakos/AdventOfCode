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

fn check_contain(arr1: &Vec<i32>, arr2: &Vec<i32>) -> bool {
    if arr1[0] >= arr2[0] && arr1[1] <= arr2[1] {
        return true;
    }
    if arr2[0] >= arr1[0] && arr2[1] <= arr1[1] {
        return true;
    }
    false
}

fn check_overlap(arr1: &Vec<i32>, arr2: &Vec<i32>) -> bool {
    let arr1_range = arr1[0]..=arr1[1];
    let arr2_range = arr2[0]..=arr2[1];
    if arr1_range.contains(&arr2[0]) || arr1_range.contains(&arr2[1]) {
        return true;
    }
    if arr2_range.contains(&arr1[0]) || arr2_range.contains(&arr1[1]) {
        return true;
    }
    false
}
fn main() {
    let file_path = "../2022/input4.txt";
    let lines = lines_from_file(file_path);

    let mut contained_pairs = 0;
    for line in &lines {
        let parts = line.split(",").collect::<Vec<&str>>();

        let pair1 = parts[0]
            .split("-")
            .map(|s| s.parse::<i32>().unwrap())
            .collect::<Vec<i32>>();
        let pair2 = parts[1]
            .split("-")
            .map(|s| s.parse::<i32>().unwrap())
            .collect::<Vec<i32>>();
        if check_contain(&pair1, &pair2) {
            contained_pairs += 1;
        }
        // println!(
        //     "Pair: {:?} {:?} Result: {:?}",
        //     pair1,
        //     pair2,
        //     compare_bounds(&pair1, &pair2)
        // )
    }

    println!("Part 1 contained pairs: {:?}", contained_pairs);

    let mut overlaping_pairs = 0;
    for line in &lines {
        let parts = line.split(",").collect::<Vec<&str>>();

        let pair1 = parts[0]
            .split("-")
            .map(|s| s.parse::<i32>().unwrap())
            .collect::<Vec<i32>>();
        let pair2 = parts[1]
            .split("-")
            .map(|s| s.parse::<i32>().unwrap())
            .collect::<Vec<i32>>();
        if check_overlap(&pair1, &pair2) {
            overlaping_pairs += 1;
        }
        // println!(
        //     "Pair: {:?} {:?} Result: {:?}",
        //     pair1,
        //     pair2,
        //     check_overlap(&pair1, &pair2)
        // )
    }

    println!("Part 2 overlaping pairs: {:?}", overlaping_pairs);
}
