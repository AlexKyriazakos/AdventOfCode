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

fn execute_command(arr: &mut Vec<Vec<String>>, command: &String, advanced_crane: bool) {
    if let [amount, from, to] = command
        .split_whitespace()
        .filter(|s| s.parse::<i32>().is_ok())
        .map(|s| s.parse::<i32>().expect("this should work"))
        .collect::<Vec<_>>()[..]
    {
        let mut intermediate_vec: Vec<String> = vec![];
        let from_index = usize::try_from(from - 1).expect("Won't fail");
        let to_index = usize::try_from(to - 1).expect("Won't fail");
        for _index in 1..=amount {
            // println!(
            //     "Moving {:?} of {:?} from {:?} to {:?}",
            //     _index, amount, from, to
            // );

            let container = arr[from_index].pop().unwrap();

            if advanced_crane {
                intermediate_vec.push(container);
            } else {
                arr[to_index].push(container);
            }
        }
        if advanced_crane {
            for cont in intermediate_vec.iter().rev() {
                arr[to_index].push(cont.clone());
            }
        }
    }
}

fn main() {
    let file_path = "../2022/input5.txt";
    let lines = lines_from_file(file_path);

    let empty_index = lines.iter().position(|r| r.len() == 0).unwrap();

    let stack_string = &lines[..empty_index - 1];
    println!("Stack is {:?}", stack_string);

    let col_len = (stack_string[0].len() + 1)
        .checked_div_euclid(4)
        .expect("This should work.");
    println!("Total columns {:?}", col_len);

    let move_commands = &lines[empty_index + 1..];
    println!("Commands are {:?}", move_commands);

    let mut columns = std::iter::repeat(vec![])
        .take(col_len)
        .collect::<Vec<Vec<String>>>();

    for line in stack_string.iter().rev() {
        // println!("Line is {:?}", line);
        let mut index = 0;
        while line.len() > index * 4 {
            let column: String = line.chars().skip(index * 4).take(3).collect();
            if !column.trim().is_empty() {
                columns[index].push(column);
            }
            // println!("Column {:?} is {:?}", index + 1, columns[index]);
            // println!("Current vector {:?}", columns[index]);

            index += 1;
        }
    }

    println!("Boxes are {:?}", columns);
    for command in move_commands {
        execute_command(&mut columns, command, false);
    }
    println!("Boxes are {:?}", columns);

    for mut column in columns {
        print!(
            "{}",
            column.pop().unwrap().replace("[", "").replace("]", "")
        )
    }
    println!();

    let mut columns = std::iter::repeat(vec![])
        .take(col_len)
        .collect::<Vec<Vec<String>>>();

    for line in stack_string.iter().rev() {
        // println!("Line is {:?}", line);
        let mut index = 0;
        while line.len() > index * 4 {
            let column: String = line.chars().skip(index * 4).take(3).collect();
            if !column.trim().is_empty() {
                columns[index].push(column);
            }
            // println!("Column {:?} is {:?}", index + 1, columns[index]);
            // println!("Current vector {:?}", columns[index]);

            index += 1;
        }
    }
    println!("Boxes are {:?}", columns);
    for command in move_commands {
        execute_command(&mut columns, command, true);
    }
    println!("Boxes are {:?}", columns);

    for mut column in columns {
        print!(
            "{}",
            column.pop().unwrap().replace("[", "").replace("]", "")
        )
    }

    // for line in &lines {
    //     println!("Line is {:?}", line);
    //     if line.len() == 0 {
    //         break;
    //     }

    //     let offset = 4;
    //     let mut index = 0;
    //     while line.len() > offset * index {
    //         let column: String = line.chars().skip(index * offset).take(3).collect();
    //         println!("Column {:?} is {:?}", index + 1, column);

    //         index += 1;
    //     }
    // }

    // println!("RES is {:?}", res);
}
