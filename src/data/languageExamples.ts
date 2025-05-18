import { LanguageExample } from '../types/theme';

export const languageExamples: LanguageExample[] = [
  {
    id: "javascript",
    name: "JavaScript",
    code: `// A simple JavaScript example
function fibonacci(n) {
  if (n <= 1) return n;
  
  const sequence = [0, 1];
  for (let i = 2; i <= n; i++) {
    sequence[i] = sequence[i - 1] + sequence[i - 2];
  }
  
  return sequence[n];
}

// Class example
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Hello, my name is \${this.name}\`;
  }
  
  static createAnonymous() {
    return new Person("Anonymous", 0);
  }
}

const MAX_AGE = 120;
const person = new Person("John", 30);
console.log(person.greet());`
  },
  {
    id: "typescript",
    name: "TypeScript",
    code: `// A TypeScript example
interface User {
  id: number;
  name: string;
  email?: string;
  age: number;
}

type AdminUser = User & {
  role: 'admin';
  permissions: string[];
};

const ROLES = ['user', 'admin', 'guest'] as const;
type Role = typeof ROLES[number];

function createUser(data: Partial<User>): User {
  return {
    id: Math.floor(Math.random() * 1000),
    name: data.name || 'Anonymous',
    age: data.age || 0,
    ...data
  };
}

const user: User = createUser({ name: 'Alice', age: 28 });
console.log(\`Created user: \${user.name}\`);

// Generic function
function getFirst<T>(array: T[]): T | undefined {
  return array[0];
}`
  },
  {
    id: "html",
    name: "HTML",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sample HTML</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="main-header">
    <h1>My Website</h1>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="hero">
      <h2>Welcome to my site</h2>
      <p>This is a sample HTML document.</p>
    </section>
    
    <article class="post">
      <h3>Article Title</h3>
      <p>Article content goes here...</p>
    </article>
  </main>

  <footer>
    <p>&copy; 2025 My Website</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>`
  },
  {
    id: "css",
    name: "CSS",
    code: `/* Main CSS styles */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
  --dark-color: #1f2937;
  --light-color: #f9fafb;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--dark-color);
  background-color: var(--light-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.btn {
  display: inline-block;
  background: var(--primary-color);
  color: white;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.btn:hover {
  opacity: 0.9;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
}`
  },
  {
    id: "python",
    name: "Python",
    code: `# Python example with various language features
import os
from dataclasses import dataclass
from typing import List, Optional, Dict, Any

@dataclass
class Person:
    name: str
    age: int
    emails: List[str] = None
    
    def __post_init__(self):
        if self.emails is None:
            self.emails = []
    
    def is_adult(self) -> bool:
        """Check if person is an adult."""
        return self.age >= 18
    
    def __str__(self) -> str:
        return f"{self.name} ({self.age})"


def fibonacci(n: int) -> int:
    """Calculate the nth Fibonacci number recursively."""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)


# Dictionary comprehension
squares = {x: x*x for x in range(10)}

# String formatting
name = "World"
print(f"Hello, {name}!")

# Constants
MAX_USERS = 100
PI = 3.14159

# Context manager
with open("example.txt", "w") as file:
    file.write("Hello, World!")`
  },
  {
    id: "java",
    name: "Java",
    code: `// Java example with various features
package com.example.demo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class Application {

    public static void main(String[] args) {
        List<Person> people = new ArrayList<>();
        people.add(new Person("Alice", 28));
        people.add(new Person("Bob", 32));
        people.add(new Person("Charlie", 19));
        
        // Using streams
        List<Person> adults = people.stream()
                .filter(Person::isAdult)
                .collect(Collectors.toList());
                
        // Lambda expressions
        adults.forEach(person -> System.out.println(person.getName()));
        
        // Optional handling
        Optional<Person> oldest = people.stream()
                .max((p1, p2) -> Integer.compare(p1.getAge(), p2.getAge()));
                
        oldest.ifPresent(person -> {
            System.out.println("Oldest person: " + person.getName());
        });
    }
}

class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    public boolean isAdult() {
        return age >= 18;
    }
    
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}`
  },
];